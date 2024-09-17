import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

const interceptorMap = new Map<Function, SerializeInterceptor<unknown>>();

export function Serialize<T extends object>(
  dto: ClassConstructor<T>,
): MethodDecorator & ClassDecorator {
  if (!interceptorMap.has(dto)) {
    interceptorMap.set(dto, new SerializeInterceptor(dto));
  }
  return UseInterceptors(interceptorMap.get(dto)!);
}

class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
