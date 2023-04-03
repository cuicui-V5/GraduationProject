export interface homeStatusType {
  type: string;
  time: number;
  rooms: Room[];
}

export interface Room {
  describe: string;
  name: string;
  temperature: number;
  humidity: number;
  pm25: number;
  devices: Device[];
}

export interface Device {
  describe: string;
  type: "tv" | "fan" | "light" | "cam" | "sensor";
  id: number;
  status: boolean;
  value: number;
  value2: number;
  value3: number;
  value4: string;
  message: string;
}
