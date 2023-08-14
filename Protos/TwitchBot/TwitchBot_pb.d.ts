import * as jspb from 'google-protobuf'



export class CheckJoinedRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckJoinedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckJoinedRequest): CheckJoinedRequest.AsObject;
  static serializeBinaryToWriter(message: CheckJoinedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckJoinedRequest;
  static deserializeBinaryFromReader(message: CheckJoinedRequest, reader: jspb.BinaryReader): CheckJoinedRequest;
}

export namespace CheckJoinedRequest {
  export type AsObject = {
  }
}

export class CheckJoinedResponse extends jspb.Message {
  getJoined(): boolean;
  setJoined(value: boolean): CheckJoinedResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckJoinedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckJoinedResponse): CheckJoinedResponse.AsObject;
  static serializeBinaryToWriter(message: CheckJoinedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckJoinedResponse;
  static deserializeBinaryFromReader(message: CheckJoinedResponse, reader: jspb.BinaryReader): CheckJoinedResponse;
}

export namespace CheckJoinedResponse {
  export type AsObject = {
    joined: boolean,
  }
}

export class TmiStatusRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TmiStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TmiStatusRequest): TmiStatusRequest.AsObject;
  static serializeBinaryToWriter(message: TmiStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TmiStatusRequest;
  static deserializeBinaryFromReader(message: TmiStatusRequest, reader: jspb.BinaryReader): TmiStatusRequest;
}

export namespace TmiStatusRequest {
  export type AsObject = {
  }
}

export class TmiStatusResponse extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): TmiStatusResponse;

  getReadystate(): ReadyState;
  setReadystate(value: ReadyState): TmiStatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TmiStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TmiStatusResponse): TmiStatusResponse.AsObject;
  static serializeBinaryToWriter(message: TmiStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TmiStatusResponse;
  static deserializeBinaryFromReader(message: TmiStatusResponse, reader: jspb.BinaryReader): TmiStatusResponse;
}

export namespace TmiStatusResponse {
  export type AsObject = {
    msg: string,
    readystate: ReadyState,
  }
}

export class StartTmiRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartTmiRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartTmiRequest): StartTmiRequest.AsObject;
  static serializeBinaryToWriter(message: StartTmiRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartTmiRequest;
  static deserializeBinaryFromReader(message: StartTmiRequest, reader: jspb.BinaryReader): StartTmiRequest;
}

export namespace StartTmiRequest {
  export type AsObject = {
  }
}

export class StartTmiResponse extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): StartTmiResponse;

  getReadystate(): ReadyState;
  setReadystate(value: ReadyState): StartTmiResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartTmiResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartTmiResponse): StartTmiResponse.AsObject;
  static serializeBinaryToWriter(message: StartTmiResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartTmiResponse;
  static deserializeBinaryFromReader(message: StartTmiResponse, reader: jspb.BinaryReader): StartTmiResponse;
}

export namespace StartTmiResponse {
  export type AsObject = {
    msg: string,
    readystate: ReadyState,
  }
}

export enum ReadyState { 
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}
