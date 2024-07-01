async function checkTask() {
  const task = document.getElementById('taskInput').value;
  const resultDiv = document.getElementById('result');

  if (!task) {
    resultDiv.innerText = 'Please enter a task.';
    return;
  }

  resultDiv.innerText = 'Checking...';

  const response = await fetch('/check-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });

  const data = await response.json();

  resultDiv.innerText = `AI Compatibility Score: ${data.score}/10 (${data.category})`;
}
