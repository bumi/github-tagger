# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  include Railslove::Routes::NestedUtils
  
  before_filter :init_polymorphic_variables
  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  #protect_from_forgery # :secret => '0688d58c156a7f7447acf6f5461ae2e4'
end
