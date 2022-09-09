declare module '*.scss' {
    const content: Record<string, string>;
    
    export default content;
}

declare module '*.svg' {
    const content: string;
    
    export default content;
}

declare global {
    interface Window { 
        $RefreshReg$: any,
        $RefreshSig$: any,
     }
}