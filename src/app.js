const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check route (important for AWS ECS later)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// Main route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my CI/CD app 🚀',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // export for testing
```

---

### 📝 File 3: `.gitignore`
```
node_modules/
.env
coverage/
*.log
.DS_Store