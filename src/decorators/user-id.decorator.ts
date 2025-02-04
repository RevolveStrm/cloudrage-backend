import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest();

    return request.user?.id ? Number(request.user.id) : null;
  },
);
