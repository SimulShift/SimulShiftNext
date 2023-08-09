import * as jspb from 'google-protobuf'



export class LoginRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
  }
}

export class LoginResponse extends jspb.Message {
  getStatus(): LoginResponse.Status;
  setStatus(value: LoginResponse.Status): LoginResponse;

  getSessionid(): string;
  setSessionid(value: string): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    status: LoginResponse.Status,
    sessionid: string,
  }

  export enum Status { 
    LOGGED_IN = 0,
    ALREADY_LOGGED_IN = 1,
    INVALID_CREDENTIALS = 2,
    ERROR = 3,
  }
}

