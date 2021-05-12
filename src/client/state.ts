const content = document.querySelector(".content")
export function messageUpdate(update: string[]) {
  let html = ""
  update.forEach(v => {
    html += `
    <div>${v}</div>
    `
  })
  content!.innerHTML = html
}
