export default
`#version 300 es
precision highp float;

uniform vec4 light_pos_1;

uniform vec4 light_amb_c_1;
uniform float light_amb_k_1;

uniform vec4 light_dif_c_1;
uniform float light_dif_k_1;

uniform vec4 light_esp_c_1;
uniform float light_esp_k_1;
uniform float light_esp_p_1;

uniform vec4 light_pos_2;

uniform vec4 light_amb_c_2;
uniform float light_amb_k_2;

uniform vec4 light_dif_c_2;
uniform float light_dif_k_2;

uniform vec4 light_esp_c_2;
uniform float light_esp_k_2;
uniform float light_esp_p_2;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

in vec4 fPosition;
in vec4 fColor;
in vec4 fNormal;

out vec4 minhaColor;

void main()
{
  mat4 modelView = u_view * u_model;

  // posição do vértice no sistema da câmera
  vec4 viewPosition = modelView * fPosition;

  // posição final do vertice  
  // normal do vértice no sistema da câmera
  vec4 viewNormal = transpose(inverse(modelView)) * fNormal;
  viewNormal = normalize(viewNormal);

  // posição da luz no sistema da câmera
  vec4 viewLightPos = u_view * light_pos_1;
  vec4 viewLightPos_2 = u_view * light_pos_2;

  // direção da luz
  vec4 lightDir = normalize(viewLightPos - viewPosition);
  vec4 lightDir_2 = normalize(viewLightPos_2 - viewPosition);

  // direção da camera (camera está na origem)
  vec4 cameraDir = normalize(-viewPosition);

  // fator da componente difusa
  float fatorDif = max(0.0, dot(lightDir, viewNormal));
  float fatorDif_2 = max(0.0, dot(lightDir_2, viewNormal));

  // fator da componente especular
  vec4 halfVec = normalize(lightDir + cameraDir);
  float fatorEsp = pow(max(0.0, dot(halfVec, viewNormal)), light_esp_p_1);
  
  vec4 halfVec_2 = normalize(lightDir_2 + cameraDir);
  float fatorEsp_2 = pow(max(0.0, dot(halfVec_2, viewNormal)), light_esp_p_2);

  // cor final do vértice
  minhaColor = 0.20 * fColor 
    + 0.40 * (light_amb_k_1 * light_amb_c_1 + fatorDif * light_dif_k_1 * light_dif_c_1 + fatorEsp * light_esp_k_1 * light_esp_c_1)
    + 0.40 * (light_amb_k_2 * light_amb_c_2 + fatorDif_2 * light_dif_k_2 * light_dif_c_2 + fatorEsp_2 * light_esp_k_2 * light_esp_c_2);
}`