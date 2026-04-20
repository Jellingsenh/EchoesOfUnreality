package com.jellingsen.games.echoes_of_unreality;

import org.springframework.boot.SpringApplication;

import com.jellingsen.games.echoes_of_unreality.API.EchoesEndpoints;

public class MainApplication {
	public static void main(String[] args) {
		SpringApplication.run(EchoesEndpoints.class, args);
	}
}