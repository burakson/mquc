class Player < ActiveRecord::Base
  validates_uniqueness_of :name

  def as_json(options={})
    super(options).reject { |k, v| v.nil? }
  end
end
