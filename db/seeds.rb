if Player.count == 0
  players_json = JSON.parse(File.read("#{File.dirname(__FILE__)}/dummy-data/players.json"))
  Player.create!(players_json)
  puts "#{Player.count} players have been added."
end

if Club_metadata.count == 0
  clubdata_json = JSON.parse(File.read("#{File.dirname(__FILE__)}/dummy-data/club.json"))
  Club_metadata.create(clubdata_json)
  puts "Club data has been inserted"
end

puts "Seed finalized!"
