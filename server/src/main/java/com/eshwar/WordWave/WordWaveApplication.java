package com.eshwar.WordWave;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WordWaveApplication {

	public static void main(String[] args) {
		SpringApplication.run(WordWaveApplication.class, args);
		System.out.println("The Server is started at port no 8080");
	}

}
