from rest_framework import routers
from .api import LeadVieset

router = routers.DefaultRouter()

router.register('api/leads', LeadVieset, 'leads')


urlpatterns = router.urls