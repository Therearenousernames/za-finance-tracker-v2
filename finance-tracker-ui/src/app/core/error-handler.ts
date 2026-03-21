import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                localStorage.clear();
                window.location.href = '/login';
            }
            return throwError(() => error);
        })
    );
};
