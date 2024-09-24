export const generateUserImage = async (name: any) => {
  const canvas = document.createElement("canvas");
  const context: any = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 100;
  canvas.height = 100;

  // Generate random background color
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  context.fillStyle = randomColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text (first letter of the name)
  context.font = "60px Arial";
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(name[0].toUpperCase(), canvas.width / 2, canvas.height / 2);

  // Convert canvas to data URL and set as image source
  const dataURL = canvas.toDataURL();

  return dataURL;
};
