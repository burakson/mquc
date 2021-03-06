require 'sinatra'
require 'active_record'
require 'sinatra/activerecord'

require_relative 'lib/helpers'
require_relative 'routes/init.rb'
require_relative 'routes/players.rb'
require_relative 'routes/club.rb'

class Mquc < Sinatra::Application
  configure do
    set :site_title, 'Mes que un club'
    set :views, Proc.new { File.join(root, 'server/views') }
    set :haml, {:format => :html5, :escape_html => true}
  end
end
