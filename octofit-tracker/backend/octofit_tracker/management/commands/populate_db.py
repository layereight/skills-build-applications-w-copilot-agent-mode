from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Lösche bestehende Daten
        # Workaround für Djongo-Löschproblem: Lösche einzeln, falls nötig
        for model in [Activity, Leaderboard, Workout, User, Team]:
            for obj in model.objects.all():
                try:
                    obj.delete()
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"Fehler beim Löschen von {model.__name__}: {e}"))

        # Teams
        marvel = Team.objects.create(name='Marvel', universe='Marvel')
        dc = Team.objects.create(name='DC', universe='DC')

        # Users
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel)
        captain = User.objects.create(email='captain@marvel.com', name='Captain America', team=marvel)
        batman = User.objects.create(email='batman@dc.com', name='Batman', team=dc)
        superman = User.objects.create(email='superman@dc.com', name='Superman', team=dc)

        from datetime import date
        # Activities
        Activity.objects.create(user=ironman, type='Run', duration=30, date=date(2024, 5, 1))
        Activity.objects.create(user=captain, type='Swim', duration=45, date=date(2024, 5, 2))
        Activity.objects.create(user=batman, type='Bike', duration=60, date=date(2024, 5, 3))
        Activity.objects.create(user=superman, type='Yoga', duration=50, date=date(2024, 5, 4))

        # Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio for all heroes', suggested_for='All')
        Workout.objects.create(name='Strength Training', description='Strength for all heroes', suggested_for='All')

        # Leaderboard
        Leaderboard.objects.create(user=ironman, points=1000, rank=2)
        Leaderboard.objects.create(user=captain, points=900, rank=4)
        Leaderboard.objects.create(user=batman, points=950, rank=3)
        Leaderboard.objects.create(user=superman, points=1100, rank=1)

        self.stdout.write(self.style.SUCCESS('Testdaten erfolgreich eingefügt.'))
