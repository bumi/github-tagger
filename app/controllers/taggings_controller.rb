class TaggingsController < ApplicationController
 
  def index
    if params[:repository] && @repository = Repository.find_or_create_from_url(params[:repository])
      @taggings = polymorphic_object!.taggings.find_all_by_repository_id(@repository.id)
    else
      @taggings = polymorphic_object!.taggings.find(:all)
    end
    
    respond_to do |format|
      format.js { render :json => @taggings, :callback => params[:callback]}
    end
  end
  
  
  def create
    @repository = Repository.find_or_create_from_url(params[:repository])
    @tagging = @repository.taggings.create_from_list(params[:tags], User.find_or_create_by_name(params[:user]))

    respond_to do |format|
      format.js { render :json => @tagging, :callback => params[:callback]}
    end
  end

end
