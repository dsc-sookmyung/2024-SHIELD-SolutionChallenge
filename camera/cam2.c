#include "WiFi.h"
#include "HTTPClient.h"
#include "esp_camera.h"

#define CAMERA_MODEL_AI_THINKER // Has PSRAM
#include "camera_pins.h"
#define BOARD_HAS_PSRAM

// WiFi 설정
const char* ssid = "**********";
const char* password = "**********";

// AWS API Gateway URL
const char* serverName = "https://**********/cam2.jpg";

void setup() {
  Serial.begin(115200);

  // 카메라 설정 (OV2640)
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_UXGA; // 해상도 설정
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  Serial.println("Camera Initialize Start");
  // 카메라 초기화
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    // 추가적인 오류 처리...
  } else {
    Serial.println("Camera init succeeded");
    // 추가적인 성공 처리...
  }
  Serial.println("Camera Initialization Done");
  // WiFi 연결
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi Connected");
//}

 // Get the camera sensor
  sensor_t * s = esp_camera_sensor_get();

  // Check if the sensor is available
  if (!s) {
    Serial.println("Failed to acquire the camera sensor");
    return;
  }

// Adjust camera settings
  // Example settings:
  s->set_vflip(s, 1); // flip it back
  s->set_hmirror(s, 1); // flip it horizontally
  s->set_brightness(s, 2);      // -2 to 2
  s->set_contrast(s, 1);        // -2 to 2
  s->set_saturation(s, 2);      // -2 to 2
  s->set_special_effect(s, 0);  // 0: no effect, 2: Sepia, 3: Negative
  s->set_whitebal(s, 1);        // 0: disable , 1: enable
  s->set_awb_gain(s, 1);        // 0: disable, 1: enable
  s->set_wb_mode(s, 0);         // 0: auto, 1: sunny, 2: cloudy, 3: office, 4: home
  s->set_exposure_ctrl(s, 1);   // 0: disable, 1: enable
  s->set_aec2(s, 0);            // 0: disable, 1: enable
  s->set_ae_level(s, 0);        // -2 to 2
  s->set_aec_value(s, 300);     // 0 to 1200
  s->set_gain_ctrl(s, 1);       // 0: disable, 1: enable
  s->set_agc_gain(s, 0);        // 0 to 30
  s->set_gainceiling(s, (gainceiling_t)1); // 0 to 6
  s->set_bpc(s, 0);             // 0: disable, 1: enable
  s->set_wpc(s, 1);             // 0: disable, 1: enable
  s->set_raw_gma(s, 1);         // 0: disable, 1: enable
  s->set_lenc(s, 1);            // 0: disable, 1: enable
  s->set_dcw(s, 1);             // 0: disable, 1: enable
}

void loop() {
  // 사진 캡처
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    delay(60000);
    return;
  }

  // AWS API Gateway로 사진 전송
  HTTPClient http;
  http.begin(serverName);
  http.addHeader("Content-Type", "image/jpeg");
  http.addHeader("Content-Disposition", "attachment; filename=cam2.jpg"); // 파일 이름 설정
  int httpResponseCode = http.PUT(fb->buf, fb->len);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(httpResponseCode);
    Serial.println(response);
  } else {
    Serial.print("Error on sending PUT: ");
    Serial.println(httpResponseCode);
  }

  // HTTP 연결 종료
  http.end();

  // 캡처된 프레임 버퍼 해제
  esp_camera_fb_return(fb);

  // 1분 대기
  delay(60000);
}