import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): ParameterDecorator => {
    const req = context.switchToHttp().getRequest();
    return req.currentUser;
  },
);
