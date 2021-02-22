import { Nullable } from "./Types";

export class PromiseResolver<T=void>{

    private resolver : Nullable<( value: T | PromiseLike<T> )=> void>;
    private rejector : Nullable<( error: Error )=> void>;

    private promise : Promise<T>

    constructor(){

        this.resolver = null;
        this.rejector = null;

        this.promise = new Promise<T>( (resolve, reject)=>{
            this.resolver = resolve;
            this.rejector = reject;
        });
    }

    public getPromise() {
        return this.promise;
    }

    public resolve( value? : T ){
        if( !this.resolver ) return;

        this.resolver( value as T );
        
        this.setAsNotPending();
    }

    public reject( error : Error ){
        if( !this.rejector ) return;

        this.rejector( error );
        
        this.setAsNotPending();
    }

    private setAsNotPending() {
        this.resolver = null;
        this.rejector = null;
    }
}