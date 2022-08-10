import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';


export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const userId = headers['user-id'];
    if(userId) return userId;
    
    throw new BadRequestException("Headers must contain user-id")
  },
);
