#include <Servo.h>
Servo myservo;
String data = Serial.readString();

void setup() {
  Serial.begin(9600);
  myservo.attach(9);  
}

void loop() {
  if (Serial.available()){
    if (data.indexOf("يمين")){
      myservo.write(180); 
    }
    else if (data.indexOf("يسار")){
      myservo.write(0); 
    }
    else{
      myservo.write(360); 
    }
  }
}
