require 'sinatra'
require 'sinatra/json'

# GET https://myserver.lol/parts/part555
get '/parts/:partnumber' do
  database = {
    partone: { name: "Cannabis Indica", price: 3.99, unit: "g" },
    parttwo: { name: "Cannabis Sativa", price: 6.99, unit: "g" }
  }
  partnumber = params[:partnumber].to_sym
  response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  if database[partnumber]
    json(database[partnumber])
  else
    # failure case
    status 500
    json({ error: "No product" })
  end
end
