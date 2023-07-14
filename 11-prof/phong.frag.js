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

  // direção da luz
  vec4 lightDir = normalize(viewLightPos - viewPosition);

  // direção da camera (camera está na origem)
  vec4 cameraDir = normalize(-viewPosition);

  // fator da componente difusa
  float fatorDif = max(0.0, dot(lightDir, viewNormal));

  // fator da componente especular
  vec4 halfVec = normalize(lightDir + cameraDir);
  float fatorEsp = pow(max(0.0, dot(halfVec, viewNormal)), light_esp_p_1);

  // cor final do vértice
  minhaColor = 0.25 * fColor + 0.75 * (light_amb_k_1 * light_amb_c_1 + fatorDif * light_dif_k_1 * light_dif_c_1 + fatorEsp * light_esp_k_1 * light_esp_c_1);
}`