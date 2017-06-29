var context = require.context('./assets/js', true, /-spec\.js$/);
context.keys().forEach(context);