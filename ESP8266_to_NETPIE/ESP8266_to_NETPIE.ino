#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <MicroGear.h>


/* Pinout */
#define D5 14
#define D6 12
#define D7 13

/* Microgear */
const char* ssid = "M"; // ใส่ชื่อ WiFi SSID แทน SSID
const char* password = "0915526588"; // ใส่รหสัผ่าน WiFi แทน PASSWORD

#define appID  "Mill"

// Session "Sensors"
#define sessionKey  "fhbbF2Dr7HIeSUF"
#define sessionSecret  "jE9nukdPeEujEC1P289nDWRIu"

#define ALIAS "esp8266"



/* Obj Decl*/
SoftwareSerial mySerial(D5, D6); // Rx , Tx
WiFiClient client;
MicroGear microgear(client);

/* Global Decl*/
char s[50];

/* Microgear Handler*/
void onConnected(char *attribute, uint8_t* msg, unsigned int msglen) {
 Serial.println("Connected to NETPIE...");
 microgear.setAlias(ALIAS);
}


void setup() {
  pinMode(D5, OUTPUT);
  pinMode(D6, INPUT);
  Serial.begin(38400);
  mySerial.begin(38400);

   /* --- Microgear init ---*/
  microgear.on(CONNECTED,onConnected);
  if (WiFi.begin(ssid, password)) {
     while (WiFi.status() != WL_CONNECTED) {
       delay(500);
       Serial.print(".");
       }
   }
   Serial.println("WiFi connected");
   Serial.println("IP address: ");
   Serial.println(WiFi.localIP());
   microgear.init(sessionKey,sessionSecret,ALIAS);
   microgear.connect(appID);
   
}
String msg;

void loop() {
  if (microgear.connected()) {
    Serial.println("..."); 
    microgear.loop();
    while(!mySerial.available());
    while(mySerial.available()){
      msg = mySerial.readStringUntil('x');
      Serial.println(msg);
     microgear.chat("t2",msg);
    }
   
  }

}
