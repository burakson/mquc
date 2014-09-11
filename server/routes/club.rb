require_relative '../models/clubdata'

get '/api/club_data/?' do
  club_data = Club_metadata.first
  if club_data
    club_data.to_json
  end
end