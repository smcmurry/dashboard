@app
csfs-dashboard-a5e9

@http
/*
  method any
  src server

@static

@tables
csfsuser
  pk *String

csfspassword
  pk *String # userId

csfsposturedata
  uuid *String

csfsnote
  pk *String  # userId
  sk **String # noteId

@aws
  region us-east-1

@plugins
  extend-arc