import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [
    {id: 1, email: 'test@gmail.com', password: 'test', firstName: 'Test', lastName: 'User', roles: ['employee']},
    {id: 2, email: 'test2@gmail.com', password: 'test', firstName: 'Test', lastName: 'User', roles: ['haha']},
    {id: 3, email: 'test3@gmail.com', password: 'test', firstName: 'Test', lastName: 'User', roles: ['patron']},
    {id: 1, email: 'test4@gmail.com', password: 'test', firstName: 'Test', lastName: 'User', roles: ['employee', 'manager']},
]

const employees = 
[
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Sonia', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Adam', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Blake', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Matthew', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Sophia', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Jordan', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'Julia', lastName: 'Beard', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'},
    {firstName: 'John', lastName: 'Snow', email: 'JohnSnow@BeanScene.com', phoneNumber: '043354544'}
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor
{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/user/signin') && method === 'POST':
                    return authenticate();
                case url.endsWith('/patron') && method === 'POST':
                    return registerPatron();
                case url.endsWith('/employee') && method === 'GET':
                    return returnEmployees();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Email or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
                roles: user.roles
            })
        }

        function returnEmployees()
        {
            return ok(employees);
        }

        function registerPatron()
        {
            const { user } = body;
            const userExists = users.find(x => x.email === user.email )
            if(userExists)
            {
               return error('User already exists');
            }
            user.id = users.length + 1;
            user.roles = ['patron'];
            users.push(user);
            return ok(user);
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }));
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorised' } }));
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};