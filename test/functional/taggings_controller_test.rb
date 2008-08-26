require File.dirname(__FILE__) + '/../test_helper'

class TaggingsControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:taggings)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_tagging
    assert_difference('Tagging.count') do
      post :create, :tagging => { }
    end

    assert_redirected_to tagging_path(assigns(:tagging))
  end

  def test_should_show_tagging
    get :show, :id => taggings(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => taggings(:one).id
    assert_response :success
  end

  def test_should_update_tagging
    put :update, :id => taggings(:one).id, :tagging => { }
    assert_redirected_to tagging_path(assigns(:tagging))
  end

  def test_should_destroy_tagging
    assert_difference('Tagging.count', -1) do
      delete :destroy, :id => taggings(:one).id
    end

    assert_redirected_to taggings_path
  end
end
