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

export class CheckTmiOnlineRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckTmiOnlineRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckTmiOnlineRequest): CheckTmiOnlineRequest.AsObject;
  static serializeBinaryToWriter(message: CheckTmiOnlineRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckTmiOnlineRequest;
  static deserializeBinaryFromReader(message: CheckTmiOnlineRequest, reader: jspb.BinaryReader): CheckTmiOnlineRequest;
}

export namespace CheckTmiOnlineRequest {
  export type AsObject = {
  }
}

export class CheckTmiOnlineResponse extends jspb.Message {
  getReadystate(): CheckTmiOnlineResponse.ReadyState;
  setReadystate(value: CheckTmiOnlineResponse.ReadyState): CheckTmiOnlineResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckTmiOnlineResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckTmiOnlineResponse): CheckTmiOnlineResponse.AsObject;
  static serializeBinaryToWriter(message: CheckTmiOnlineResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckTmiOnlineResponse;
  static deserializeBinaryFromReader(message: CheckTmiOnlineResponse, reader: jspb.BinaryReader): CheckTmiOnlineResponse;
}

export namespace CheckTmiOnlineResponse {
  export type AsObject = {
    readystate: CheckTmiOnlineResponse.ReadyState,
  }

  export enum ReadyState { 
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
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
  getStarted(): boolean;
  setStarted(value: boolean): StartTmiResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartTmiResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartTmiResponse): StartTmiResponse.AsObject;
  static serializeBinaryToWriter(message: StartTmiResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartTmiResponse;
  static deserializeBinaryFromReader(message: StartTmiResponse, reader: jspb.BinaryReader): StartTmiResponse;
}

export namespace StartTmiResponse {
  export type AsObject = {
    started: boolean,
  }
}

