namespace Interfaces {
    export interface IVehicle {
        // simple literals
        VIN: string;
        make: string;
        model: string;
        year: number;
        color: string;
        bodyStyle: string;

        // definition to property that is an object
        renderTarget: HTMLDivElement;

        // property with another interface as its Type
        driver: IDriver;
    }

    export interface IDriver {
        name: string;
        age: number;
        gender: string;

        // lets define some functions on the interface
        gas(amount: number): void;
        brake(amount: number): void;
        honk(): void;
        punch(): void;

        // optional properties
        licenseNumber?: string;
        // Array generic of type string
        tickets?: Array<string>;

        // string indexed options
        [propertyName: string]: any;
    }
}