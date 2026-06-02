import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

console.log(
  `%cWait, you're not actually hacking. That's just console.log

You're curious. I like that.
Let's be friends ↓

github.com/mauryasagar`, 
  "color: #00FFFF; font-size: 16px; text-shadow: 0 0 4px #00FFFF;"
);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
