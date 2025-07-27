// Complete CSS Properties Extension
declare module 'react' {
  interface CSSProperties {
    // Logical Properties
    insetInlineStart?: string | number;
    insetInlineEnd?: string | number;
    insetBlockStart?: string | number;
    insetBlockEnd?: string | number;
    marginInlineStart?: string | number;
    marginInlineEnd?: string | number;
    marginBlockStart?: string | number;
    marginBlockEnd?: string | number;
    paddingInlineStart?: string | number;
    paddingInlineEnd?: string | number;
    paddingBlockStart?: string | number;
    paddingBlockEnd?: string | number;
    borderInlineStart?: string;
    borderInlineEnd?: string;
    borderBlockStart?: string;
    borderBlockEnd?: string;
    
    // Physical to Logical Property Mappings
    'inset-inline-start'?: string | number;
    'inset-inline-end'?: string | number;
    'inset-block-start'?: string | number;
    'inset-block-end'?: string | number;
    'margin-inline-start'?: string | number;
    'margin-inline-end'?: string | number;
    'margin-block-start'?: string | number;
    'margin-block-end'?: string | number;
    'padding-inline-start'?: string | number;
    'padding-inline-end'?: string | number;
    'padding-block-start'?: string | number;
    'padding-block-end'?: string | number;
    
    // CSS Custom Properties
    [key: `--${string}`]: string | number | undefined;
    
    // Any other CSS property
    [key: string]: any;
  }
}

// Also declare globally for styled-components or other CSS-in-JS
declare global {
  namespace React {
    interface CSSProperties {
      'inset-inline-start'?: string | number;
      'inset-inline-end'?: string | number;
      'inset-block-start'?: string | number;
      'inset-block-end'?: string | number;
      [key: `--${string}`]: string | number | undefined;
      [key: string]: any;
    }
  }
}

export {};