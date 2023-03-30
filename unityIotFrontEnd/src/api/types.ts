export interface homeStatusType {
  type?: string;
  rooms?: Room[];
}

export interface Room {
  describe: string;
  name: string;
  devices: Device[];
}

export interface Device {
  describe: string;
  type: string;
  id: number;
  status: boolean;
  value: number;
  value2: number;
  value3: number;
  value4: string;
  message: string;
}
