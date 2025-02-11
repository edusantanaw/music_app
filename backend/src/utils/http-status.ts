export interface IHttpStatus {
  statusCode: number;
  body?: unknown;
}

export class HttpStatus {
  public static created<T>(data?: T): IHttpStatus {
    return {
      statusCode: 201,
      body: data,
    };
  }

  public static ok<T>(data?: T): IHttpStatus {
    return {
      statusCode: 200,
      body: data,
    };
  }

  public static badRequest<T>(data?: T): IHttpStatus {
    return {
      statusCode: 400,
      body: data,
    };
  }

  public static notFound<T>(data?: T): IHttpStatus {
    return {
      statusCode: 404,
      body: data,
    };
  }

  public static serverError(): IHttpStatus {
    return {
      statusCode: 500,
      body: { message: "INTERNAL SERVER ERROR" },
    };
  }
}
