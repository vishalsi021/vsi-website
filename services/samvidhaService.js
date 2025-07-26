// services/samvidhaService.js
const puppeteer = require('puppeteer');

class SamvidhaService {
  constructor() {
    this.baseUrl = 'https://samvidha.iare.ac.in';
    // Timeout for operations, but intelligent waits should prevent hitting this on failure.
    this.timeout = parseInt(process.env.PUPPETEER_TIMEOUT, 10) || 30000;
  }

  async fetchAttendanceData(userId, password) {
    let browser = null;
    let page = null;

    try {
      console.log('🚀 Launching browser...');
      browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === 'production' ? 'new' : false,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Use path from .env if available
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      });

      page = await browser.newPage();
      
      // OPTIMIZATION: Block non-essential resources like images, fonts, and CSS to speed up loading.
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      });
      
      await page.setViewport({ width: 1366, height: 768 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      console.log('🔐 Navigating to login page...');
      await page.goto(this.baseUrl, { waitUntil: 'domcontentloaded', timeout: this.timeout });

      await page.waitForSelector('input[name="txtUserName"]', { timeout: 10000 });
      await page.type('input[name="txtUserName"]', userId);
      await page.type('input[name="txtPassword"]', password);

      try {
        console.log('✍️ Submitting credentials and verifying login...');
        await Promise.all([
          page.click('input[type="submit"][name="btnLogin"]'),
          page.waitForSelector('#ctl00_cpHeader_ucStudCorner_lblStudentName', { timeout: 15000 })
        ]);
      } catch (e) {
        // If waiting for the student name selector fails, it's almost always due to bad credentials.
        if (e instanceof puppeteer.errors.TimeoutError || e.name === 'TimeoutError') {
            throw new Error('Invalid credentials'); // Throw a specific, clear error for the controller.
        }
        throw e; // Re-throw other errors (e.g., if the button wasn't found)
      }


      console.log('✅ Login successful');
      
      const studentName = await page.evaluate(() => {
        const el = document.querySelector('#ctl00_cpHeader_ucStudCorner_lblStudentName');
        return el ? el.textContent.trim() : 'Student';
      });
      
      console.log(`👤 Student Name: ${studentName}`);

      console.log('📚 Navigating to Course Content Delivery...');
      await page.goto(`${this.baseUrl}/Reports/CourseContentDelivery`, {
        waitUntil: 'domcontentloaded',
        timeout: this.timeout
      });

      await page.waitForSelector('#tblContentDelivery', { timeout: 15000 });

      console.log('📊 Scraping attendance data...');
      const detailedLog = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('#tblContentDelivery tr'));
        return rows.slice(1).map(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length < 6) return null; // Defensive check for malformed rows
          return {
            date: cells[1]?.textContent?.trim() || '',
            subject: cells[2]?.textContent?.trim() || '',
            topic: cells[3]?.textContent?.trim() || '',
            status: cells[5]?.textContent?.trim().toUpperCase() === 'PRESENT' ? 'PRESENT' : 'ABSENT',
          };
        }).filter(log => log && log.date && log.subject);
      });

      console.log(`📈 Found ${detailedLog.length} attendance records`);
      return this.processAttendanceData(detailedLog, userId, studentName);

    } catch (error) {
      // Re-throw the error to be handled by the controller
      throw error;
    } finally {
      if (browser) await browser.close();
    }
  }

  processAttendanceData(detailedLog, userId, studentName) {
    if (!detailedLog || detailedLog.length === 0) {
      return {
        success: true,
        userId,
        name: studentName,
        overall: 0,
        subjects: [],
        detailedLog: [],
        message: 'No attendance data found.'
      };
    }

    const subjectMap = new Map();
    detailedLog.forEach(record => {
      if (!subjectMap.has(record.subject)) {
        subjectMap.set(record.subject, { present: 0, total: 0 });
      }
      const subjectData = subjectMap.get(record.subject);
      subjectData.total++;
      if (record.status === 'PRESENT') {
        subjectData.present++;
      }
    });

    const subjects = Array.from(subjectMap.entries()).map(([subjectCode, data]) => ({
      code: subjectCode,
      name: subjectCode, // Full subject name is not available, using code.
      present: data.present,
      total: data.total,
      percentage: data.total > 0 ? parseFloat(((data.present / data.total) * 100).toFixed(2)) : 0,
    })).sort((a, b) => a.code.localeCompare(b.code));

    const totalPresent = subjects.reduce((sum, s) => sum + s.present, 0);
    const totalSessions = subjects.reduce((sum, s) => sum + s.total, 0);
    const overallPercentage = totalSessions > 0 ? parseFloat(((totalPresent / totalSessions) * 100).toFixed(2)) : 0;
    
    // Note: This sorting assumes the date format from the portal is DD/MM/YYYY.
    const sortedDetailedLog = detailedLog.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB - dateA;
    });


    return {
      success: true,
      userId,
      name: studentName,
      overall: overallPercentage,
      subjects,
      detailedLog: sortedDetailedLog,
    };
  }
}

module.exports = new SamvidhaService();