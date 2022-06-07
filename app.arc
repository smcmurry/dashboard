@app
csfs-dashboard-a5e9

@http
/*
  method any
  src server

@static

@tables
csfs-user
  pk *String

csfs-password
  pk *String # userId

csfs-note
  pk *String  # userId
  sk **String # noteId

@aws
  region us-east-1