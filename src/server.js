import app from './app.js';
import config from './configs/app.js';

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
