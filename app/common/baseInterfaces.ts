import { MutableRefObject } from 'react';
import moment from 'moment';
import NetService from '../standard/service/NetService';

export interface AppInstance {
  netService: NetService,
  customizeName: string,
  inputRef: MutableRefObject<any>,
}

export interface AppConfig {
  // Config.ini
  ServerIP: string,
  ServerPort: number,
  ServerPath: string,
  ReceiveTimeout: number,
  TerminalNo: string,
  ShopId: string,
  CompanyId: string,
  PrintTemplate: string,
  CDKey: string,
  // DeviceConfig.ini
  Scanner: string,
  CashBox: string,
  ElectronicScale: string,
  Keyboard: string,
  ICCard: string,
  Printer: string,
  MSR: string,
  LineDisplay: string,
  Integrator: string,
  // DeviceParams.ini
  ScannerParams: string,
  CashBoxParams: string,
  ElectronicScaleParams: string,
  KeyboardParams: string,
  ICCardParams: string,
  PrinterParams: string,
  MSRParams: string,
  LineDisplayParams: string,
  IntegratorParams: string,
}

export interface InputProps {
  value: string,
  onChange: (e: any) => void,
  onFocus?: (e: any) => void,
  onBlur?: (e: any) => void,
  onClick?: (e: any) => void,
  ref?: MutableRefObject<any>,
  disabled?: boolean
}

export interface ButtonProps {
  onClick: (e: any) => void,
  ref?: MutableRefObject<any>
}

export interface TouchProps {
  onTouchStart: (e: any) => void,
  onTouchMove?: (e: any) => void,
  onTouchEnd: (e: any) => void,
  onMouseDown: (e: any) => void,
  onMouseMove?: (e: any) => void,
  onMouseUp: (e: any) => void,
  onClick?: (e: any) => void,
}

export interface SelectInputProps extends InputProps {
  dataList: Array<string>,
  onSelect?: (e: any, index: number) => void,
}

export interface SelectProps {
  onChange: (e: any) => void,
}
