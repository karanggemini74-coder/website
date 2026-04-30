async function check() {
  try {
    const r = await fetch('http://localhost:3000/api/plans');
    const text = await r.text();
    console.log(text);
  } catch(e) {
    console.error(e);
  }
}
check();
