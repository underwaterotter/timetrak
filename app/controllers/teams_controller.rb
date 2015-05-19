class TeamsController < ApplicationController
  def index
    @teams = current_account.teams
  end

  def new
  end

  def create
    @team = current_account.teams.build(team_params)
    if @team.save
      flash[:success] = "Team created."
      redirect_to account_seasons_path(current_account)
    else
      flash[:error] = "Error: Please make sure you team has a name."
      redirect_to account_seasons_path(current_account)
    end
  end

  def edit
    @team = current_account.teams.find(params[:id])
  end

  def update
    @team = current_account.teams.find(params[:id])

    respond_to do |format|
      if @team.update_attributes(team_params)
        format.js
      else
        format.html { redirect_to account_seasons_path(current_account), flash: { error: 'Unable to update team.'}}
      end
    end
  end

  def destroy
    Team.find(params[:id]).destroy
    flash[:success] = 'Team deleted.'
    redirect_to account_seasons_path(current_account)
  end

  def details
    @team = Team.find_by(name: params[:team_name])
    @name = @team.name
    @desc = @team.description
    @season = Season.find_by(id: @team.season_id)
    if @season.nil?
      @season = "Not in any season"
    else
      @season = @season.title
    end

    #has name,description,score(?), belongs to season
    render json: {name: @name,
                  description: @desc,
                  in_season: @season}
  end

  private

  def team_params
    params.require(:team).permit(:name, :description, :score, :season_id)
  end
end
