require_relative '../models/player'

def create_player(params={})
  puts params
end

get '/api/players/?' do
  players = Player.all
  players.to_json({ except: [:created_at, :updated_at] })
end

get '/api/players/?:id?' do
  player = Player.find_by_id(params[:id])
  return api_error(400, 'Player not found.') unless player

  player.to_json({ except: [:created_at, :updated_at] })
end

post '/api/players/?:id/?' do
end

delete '/api/players/?:id?' do
  player = Player.find_by_id(params[:id])
  return api_error(400, 'Player not found.') unless player

  player.destroy()
  message = 'User has been deleted successfully.'
  api_success(message)
end
