
export async function showConfirm(title, message) {
  const dialog = document.querySelector("#confirmation-dialog");
  const titleText = dialog.querySelector("h2");
  const msgText = dialog.querySelector("p");
  const cancelBtn = dialog.querySelector("#confirm-cancel");
  const confirmBtn = dialog.querySelector("#confirm-delete");

  titleText.textContent = title;
  msgText.textContent = message;

  dialog.showModal();

  return new Promise((resolve) => {
    cancelBtn.addEventListener("click", () => {
      dialog.close();
      resolve(false);
    }, { once: true });

    confirmBtn.addEventListener("click", () => {
      dialog.close();
      resolve(true);
    }, { once: true });
  });
}