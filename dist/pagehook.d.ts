type Hook = (arg: any) => void;
type Hooks = {
    [key: string]: Hook;
};
declare class Pagehook {
    static GLOBAL_HOOK_NAME: string;
    static ATTRIBUTE_NAME: string;
    static instance: Pagehook;
    static handler: () => void;
    private definitions;
    handler: () => void;
    constructor();
    static register(name_or_map: (string | Hooks), func: Hook): void;
    static dispatch(name: string, arg?: any): void;
    register(name_or_map: (string | Hooks), func: Hook): void;
    dispatch(name: string, arg?: any): void;
    private handlerUnbound;
    private isBlank;
}
export default Pagehook;
