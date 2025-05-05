import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Mock authentication - always authenticate in development mode
    // and add a mock user to the request
    request.user = {
      id: 'mock-user-id',
      email: 'mock-user@example.com',
      roles: ['user']
    };
    
    return true;
  }
} 