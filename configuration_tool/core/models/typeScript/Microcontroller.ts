import { ElectronicUnit } from './Utilities/ElectronicUtilities';
import { PeripheralFeatures } from './PeripheralFeatures';
import { CommunicationInterface } from './CommunicationInterfaces';
import { ElectricalCharateristics } from './ElectricalCharateristics';
import { MicrocontrollerPins as MicrocontrollerPinConfiguaration, MicrocontrollerPackageEnum, PinTypesEnum } from './MicrocontrollerPins';
import { MemorySegment } from './MemorySegment';
import { AvrMicrocontrollerBase } from './AvrMicrocontroller';

/**
 * MicrocontrollerBase
 * Note:
 * - imageSrc: è un array perchè avrò un'immagine per ogni package
 */
export class MicrocontrollerBase {
  name: MicrocontrollerNamesEnum;
  brand: MicroBrandsEnum;
  family: MicroFamiliesEnum;
  datasheetUrl: string;
  dataBus: ElectronicUnit;
  memorySegments: MemorySegment [];
  electricalCharateristics: ElectricalCharateristics;
  microcontrollerPinConfigurations: MicrocontrollerPinConfiguaration [];
  peripheralFeatures: PeripheralFeatures;
  communicationInterfaces: CommunicationInterface [];

  constructor(microcontrollerBase?: MicrocontrollerBase | AvrMicrocontrollerBase) {
    if (microcontrollerBase) {
      this.name = microcontrollerBase.name;
      this.brand = microcontrollerBase.brand;
      this.family = microcontrollerBase.family;
      this.datasheetUrl = microcontrollerBase.datasheetUrl;
      this.dataBus = microcontrollerBase.dataBus;
      this.memorySegments = microcontrollerBase.memorySegments;
      this.electricalCharateristics = microcontrollerBase.electricalCharateristics;
      this.microcontrollerPinConfigurations = microcontrollerBase.microcontrollerPinConfigurations;
      this.peripheralFeatures = microcontrollerBase.peripheralFeatures;
      this.communicationInterfaces = microcontrollerBase.communicationInterfaces;
    }
  }
  /**
  * Restituiscre il numero di Pin di un dato Microcontrollore
  * @param microcontrollerPackage Tipo di package per il quale si vuole conoscere il numero di pin
  */
  pinCount?(microcontrollerPackage: MicrocontrollerPackageEnum): number {
    let pinConfiguration = this.microcontrollerPinConfigurations.find(config => {
      return config.microcontrollerPackage == microcontrollerPackage;
    })
    let pc = pinConfiguration.pins.length;
    if (pc == pinConfiguration.defaultPinCount) {
      return pc;
    } else {
      return null;
    }
  };

  /**
   * Restituisce il numero delle I/O lines programmabili
   * @param microcontrollerPackage Tipo di package per il quale si vuole conoscere il numero di I/O lines
   */
  programmableIoLines?(microcontrollerPackage: MicrocontrollerPackageEnum): number {
    let pinConfiguration = this.microcontrollerPinConfigurations.find(config => {
      return config.microcontrollerPackage == microcontrollerPackage;
    })
    let ioLines = pinConfiguration.pins.filter(pin => {
      return pin.pinType == PinTypesEnum.IO
    })
    return ioLines.length;
  }
}


export enum MicroFamiliesEnum {
  AVR = "AVR"
}

export enum MicroBrandsEnum {
  Atmel = "Atmel"
}

export enum MicrocontrollerNamesEnum {
  ATmega32 = "ATmega32",
  ATmega328P = "ATmega328P"
}


