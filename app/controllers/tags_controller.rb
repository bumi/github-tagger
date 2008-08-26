class TagsController < ApplicationController

  def index
    @tags = Tag.find(:all)

    respond_to do |format|
      format.html # index.html.erb
    end
  end

end
