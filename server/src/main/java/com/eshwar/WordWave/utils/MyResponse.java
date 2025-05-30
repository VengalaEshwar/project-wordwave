package com.eshwar.WordWave.utils;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MyResponse<T> {
    T result;
    String error;
    String message;
    boolean status;
    public MyResponse(T result,String error,String message,boolean status){
        this.result=result;
        this.message=message;
        this.error=error;
        this.status=status;
    }
}
